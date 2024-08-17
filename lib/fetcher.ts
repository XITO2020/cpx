  import axios from 'axios';

  const fetcher = (url: string) => axios.get(url)
    .then((res) => {
      console.log("fetcher response: ", res);
      return res.data
    });

  export default fetcher;