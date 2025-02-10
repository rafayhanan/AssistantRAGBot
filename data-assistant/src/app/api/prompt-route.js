export async function POST(request) {
    try {
      const { userMessage } = await request.json();
      
      const response = await fetch('http://localhost:8000/api/process-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
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
        botResponse: "Sorry, there was an error processing your message."
      }, { status: 500 });
    }
}