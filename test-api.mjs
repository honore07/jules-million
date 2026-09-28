import axios from 'axios';

const apiKey = process.env.PERPLEXITY_API_KEY;
console.log("🔍 Testing Perplexity API directly...");
console.log("📦 API Key configured:", !!apiKey);

try {
  console.log("📤 Sending request to Perplexity API...");
  const response = await axios.post(
    'https://api.perplexity.ai/chat/completions',
    {
      model: 'pplx-7b-online',
      messages: [
        { role: 'user', content: 'Say hello' }
      ],
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    }
  );
  console.log("✅ Success! Response:", response.data.choices?.[0]?.message?.content);
} catch (error) {
  if (error.response) {
    console.error("❌ API Error:", error.response.status);
    console.error("📋 Details:", error.response.data);
  } else if (error.code === 'ENOTFOUND') {
    console.error("❌ Network error: Cannot reach API");
  } else {
    console.error("❌ Error:", error.message);
  }
}
