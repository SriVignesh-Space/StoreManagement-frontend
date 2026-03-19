

export default function convertImageUrl(url : string) : string{

   const match = url.match(/[-\w]{25,}/)

  if (!match) return url

  const fileId = match[0]
    // console.log(`https://drive.google.com/thumbnail?id=${fileId}`)
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=s800`;

}

// "https://lh3.googleusercontent.com/d/1Hia5U1Cx0OhlvgKb4hPIYYwL-9lC81wo"

//https://drive.google.com/uc?export=view&id=${fileId}

// `https://drive.google.com/thumbnail?id=${fileId}&sz=s800`