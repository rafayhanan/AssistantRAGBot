export async function POST(request) {
    try {
      const formData = await request.formData();
      
      const response = await fetch('http://localhost:8000/api/process-document', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Response.json(data);
    } catch (error) {
      console.error('Error:', error);
      return Response.json({
        error: error.message,
        botResponse: "Sorry, there was an error processing your document."
      }, { status: 500 });
    }
  }