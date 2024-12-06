
function generateUUID() {
    const str = Date.now().toString();
    const value_1 = `${str.slice(0, 8)}-${str.slice(8, 12)}`;
    const value_2 = '4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return `${value_1}-${value_2}`; 
}

export async function GET(request) {
    const id = generateUUID();
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
