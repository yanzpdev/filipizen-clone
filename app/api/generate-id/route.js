
function generateId() {
  let sid = Date.now().toString() + Math.random().toString(36) + Math.random().toString(36); 
  return sid.replace(/\./g, '');
}

export async function GET(request) {
  const id = generateId();
  return new Response(JSON.stringify({ id }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" }
  });
}

export async function POST(request) {
  return new Response(JSON.stringify({ error: "POST method is not allowed." }), {
      status: 405, // 405 Method Not Allowed
      headers: { "Content-Type": "application/json" } 
  });
}
