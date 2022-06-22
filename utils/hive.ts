import hive from '@hiveio/hive-js'
hive.api.setOptions({ url: 'https://anyx.io' });


export const getAccountsAsync = (accounts: any) => {
  return hive.api.getAccountsAsync(accounts)
}

export const hiveUsernameAvailable = async (username: string) => {
  return (await hive.api.getAccountsAsync([username]))[0] === undefined
}

export const createAccountWithAuthority = (newAccountname: string, authorityAccountname: string, activeKey: string) => {
  const owner = {
    weight_threshold: 1,
    account_auths: [[authorityAccountname, 1]],
    key_auths: []
  };
  const active = {
    weight_threshold: 1,
    account_auths: [[authorityAccountname, 1]],
    key_auths: []
  };
  const posting = {
    weight_threshold: 1,
    account_auths: [[authorityAccountname, 1]],
    key_auths: []
  };
  const memo_key = "STM7C9FCSZ6ntNsrwkU5MCvAB7TV44bUF8J4pwWLWpGY5Z7Ba7Q6e"

  const accountData = {
    creator: authorityAccountname,
    new_account_name: newAccountname,
    owner,
    active,
    posting,
    memo_key,
    json_metadata: JSON.stringify({
      "beneficiaries": [
        {
          "name": "spk.beneficiary",
          "weight": 500,
          "label": "provider"
        }
      ]
    })
  };

  const operations = [
    ['create_claimed_account', accountData]
  ]

  return hive.broadcast.sendAsync({
    operations
  }, { active: activeKey })
}

export const validateAccountName = (value: string) => {
  let i = 0,
    label: any = 0,
    len: any = 0,
    suffix: any = 0;

  suffix = "Account name should ";
  if (!value) {
    return suffix + "not be empty.";
  }
  var length = value.length;
  if (length < 3) {
    return suffix + "be longer.";
  }
  if (length > 16) {
    return suffix + "be shorter.";
  }
  if (/\./.test(value)) {
    suffix = "Each account segment should ";
  }
  var ref = value.split(".");
  for (i = 0, len = ref.length; i < len; i++) {
    label = ref[i];
    if (!/^[a-z]/.test(label)) {
      return suffix + "start with a lower case letter.";
    }
    if (!/^[a-z0-9-]*$/.test(label)) {
      return suffix + "have only lower case letters, digits, or dashes.";
    }
    if (/--/.test(label)) {
      return suffix + "have only one dash in a row.";
    }
    if (!/[a-z0-9]$/.test(label)) {
      return suffix + "end with a lower case letter or digit.";
    }
    if (!(label.length >= 3)) {
      return suffix + "be longer";
    }
  }
  return null;
}

export const addPrivateKeys = (account: any, keys: any, wif: any) => {
  const operations = [
    ['account_update', {
      account: account,
      owner: {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [
          [
            keys.ownerPubkey,
            1
          ]
        ]
      },
      active: {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [
          [
            keys.activePubkey,
            1
          ]
        ]
      },
      posting: {
        weight_threshold: 1,
        account_auths: [
          [
            'threespeak',
            1
          ]
        ],
        key_auths: [
          [
            keys.postingPubkey,
            1
          ]
        ]
      },

      memo_key: keys.memoPubkey,
      json_metadata: JSON.stringify({})
    }]
  ];

  return hive.broadcast.sendAsync({ operations }, { owner: wif });
}