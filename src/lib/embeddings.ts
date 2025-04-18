export async function getEmbeddings(text: string) {
    try {
      const response = await fetch("https://api.jina.ai/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_JINA_API_KEY}`, // Make sure to set this in your .env
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: [text.replace(/\n/g, " ").trim()],

          model: "jina-embeddings-v2-base-en",
        }),
      });
  
      const json = await response.json();
      console.log("Jina embedding response:", json);
  
      if (!json.data || !json.data[0]) {
        throw new Error("No embedding data returned from Jina");
      }
  
      return json.data[0].embedding as number[];
    } catch (error) {
      console.log("Error calling Jina embeddings API:", error);
      throw error;
    }
  }
  