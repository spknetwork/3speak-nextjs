import { Box } from '@chakra-ui/react'
import React from 'react'
import { Form, Formik } from "formik";
import { useTranslation } from 'next-export-i18n';
import { Typography } from "src/components";

const HiveSignUpComponent = () => {
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {

  };
  return (
    <Box width="100%">
      <Box mx="auto" maxWidth="9rem">
        <img
          src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
          alt="3speak logo"
          width="100%"
        />
      </Box>
      <Formik
        initialValues={{ password: "", email: "" }}
        validate={(props) => {
          const errors: any = {};

          if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(props.email)) {
            errors.email = t("login.notValidEmail");
          }

          if (!props.password) errors.password = t("required");
          if (!props.email) errors.email = t("required");

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Box mb="1.5rem" mt="1.5rem" width="100%">
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="currentPassword">
                  Email
                </label>
                <input
                  className="Input3"
                  id="email"
                  placeholder={t("login.email")}
                  type="email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="email"
                />
                {!!props.errors.email && (
                  <Typography color="#FF3333">{props.errors.email}</Typography>
                )}
              </fieldset>
            </Box>
          </Form>
        )}


      </Formik>
    </Box >
  )
}

export default HiveSignUpComponent