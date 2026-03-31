from firebase_functions import https_fn
from firebase_admin import initialize_app
import os
from google import genai
from google.genai import types

# Initialize Firebase Admin
initialize_app()

# Read the Gemini API Key from environment variables (set in Firebase config or .env)
# Using the new Google GenAI SDK
API_KEY = os.environ.get("GEMINI_API_KEY", "")

# We configure CORS to allow requests from the Next.js frontend (localhost or production domain)
@https_fn.on_call(region="europe-west1", cors=https_fn.CorsOptions(cors_origins="*", cors_methods=["get", "post"]))
def diagnose_image(req: https_fn.CallableRequest) -> any:
    """
    Simulated exploratory AI endpoint.
    Takes an image (base64 string) and returns an educational triage assessment.
    """
    # Defensive check
    if not API_KEY:
        return {"error": "Missing GEMINI_API_KEY configuration."}
        
    image_b64 = req.data.get("image")
    if not image_b64:
        return {"error": "Missing 'image' in payload."}

    try:
        # Initialize the GenAI client
        client = genai.Client(api_key=API_KEY)
        
        # In a real app we'd construct the generative part from the base64 string
        # For the Pitch Deck demo, we'll implement a structured "educational" prompt response
        prompt = (
            "You are an exploratory triage assistant for a premium hair restoration clinic."
            "Analyze the provided photo context and output a purely educational evaluation of "
            "hair density. IMPORTANT: You must include a mandatory disclaimer that this is NOT a medical diagnosis."
            "Format the output as JSON with keys: 'density_evaluation', 'recommended_action', 'mandatory_disclaimer'."
        )

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, f"Image blob data: {image_b64[:20]}..."],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )
        
        # Return the generated text string (which is JSON) back to the frontend
        return {"result": response.text}
        
    except Exception as e:
        print(f"Error during AI inference: {str(e)}")
        return {"error": "Failed to analyze image."}
