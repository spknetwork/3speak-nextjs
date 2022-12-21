// README: legacy redirect only

export async function getServerSideProps(context: any) {
  const [author, permlink] = context.query.v.split('/')
  return {
    redirect: {
      permanent: false,
      destination: `/@${author}/${permlink}`,
    },
    props:{},
  };
}

export default function Watch() {
  return (<></>)
}