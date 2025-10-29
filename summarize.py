# # # # summarize.py
# # # import sys
# # # import json
# # # import ollama

# # # pdf_text = sys.argv[1]  # PDF text passed from Node.js

# # # prompt = f"""
# # # You are an expert text summarizer.
# # # Summarize the following text in a clear, concise, and structured way.
# # # Rules:
# # # - Keep the summary under 250 words.
# # # - Focus on the main arguments, findings, and conclusions.
# # # - Remove filler, redundant details, and irrelevant parts.
# # # - Write in professional but easy-to-read language.
# # # - At the end, include 3 key takeaways as bullet points.

# # # Text:
# # # {pdf_text}
# # # """

# # # response = ollama.chat(
# # #     model="llama2",  # replace with the exact model you installed
# # #     messages=[{"role": "user", "content": prompt}]
# # # )

# # # summary = response["text"]

# # # # Return JSON so Node.js can parse it
# # # print(json.dumps({"summary": summary}))


# # # summarize.py
# # import sys
# # import json
# # import ollama

# # # Get PDF text from Node.js
# # pdf_text = sys.argv[1] if len(sys.argv) > 1 else ""

# # if not pdf_text:
# #     print(json.dumps({"summary": ""}))
# #     sys.exit(0)

# # prompt = f"""
# # You are an expert text summarizer.
# # Summarize the following text in a clear, concise, and structured way.
# # Rules:
# # - Keep the summary under 250 words.
# # - Focus on the main arguments, findings, and conclusions.
# # - Remove filler, redundant details, and irrelevant parts.
# # - At the end, include 3 key takeaways as bullet points.

# # Text:
# # {pdf_text}
# # """

# # try:
# #     # Call Ollama model
# #     response = ollama.chat(
# #         model="llama2",  # replace with the exact model you installed
# #         messages=[{"role": "user", "content": prompt}]
# #     )

# #     # DEBUG: Uncomment to see full response structure
# #     # print("DEBUG RESPONSE:", response)

# #     # Safely extract summary from response
# #     summary = (
# #         response.get("text") or
# #         response.get("content") or
# #         str(response)
# #     )

# #     # Output as JSON for Node.js
# #     print(json.dumps({"summary": summary}))

# # except Exception as e:
# #     # Return error JSON
# #     print(json.dumps({"summary": "", "error": str(e)}))


# import sys
# import json
# import ollama

# try:
#     # Read full input from stdin (works for any length)
#     pdf_text = sys.stdin.read().strip()

#     if not pdf_text:
#         print(json.dumps({"summary": ""}))
#         sys.exit(0)

#     prompt = f"""
# You are an expert text summarizer.
# Summarize the following text in a clear, concise, and structured way.
# Rules:
# - Keep the summary under 250 words.
# - Focus on the main arguments, findings, and conclusions.
# - Remove filler, redundant details, and irrelevant parts.
# - At the end, include 3 key takeaways as bullet points.

# Text:
# {pdf_text}
# """

#     # Run the LLaMA2 model locally
#     response = ollama.chat(
#         model="llama2",  # replace with your installed model name
#         messages=[{"role": "user", "content": prompt}]
#     )

#     # Safely get output (different models may return 'content' or 'text')
#     summary = response.get("text") or response.get("content") or str(response)

#     # Return JSON
#     print(json.dumps({"summary": summary}))

# except Exception as e:
#     # Return JSON error
#     print(json.dumps({"summary": "", "error": str(e)}))


import sys
import json
import ollama

# Read all chunks from stdin as JSON array
input_json = sys.stdin.read()
try:
    chunks = json.loads(input_json)  # Expecting: ["chunk1 text", "chunk2 text", ...]
except Exception as e:
    print(json.dumps({"summary": "", "error": f"Invalid input JSON: {e}"}))
    sys.exit(1)

try:
    # Initialize Ollama model once
    model_name = "llama2"  # replace with your installed model

    first_level_summaries = []

    for chunk in chunks:
        prompt = f"""
You are an expert text summarizer.
Summarize the following text in a clear, concise, and structured way.
Rules:
- Keep the summary under 250 words.
- Focus on main arguments, findings, and conclusions.
- Remove filler, redundant details, and irrelevant parts.
- At the end, include 3 key takeaways as bullet points.

Text:
{chunk}
"""
        response = ollama.chat(
            model=model_name,
            messages=[{"role": "user", "content": prompt}]
        )

        # Extract summary safely
        summary = (
            response.get("text") or
            response.get("content") or
            getattr(response, "message", {}).get("content") or
            str(response)
        )
        first_level_summaries.append(summary)

    # Combine first-level summaries into one prompt for final summary
    combined_text = " ".join(first_level_summaries)
    final_prompt = f"""
You are an expert text summarizer.
Summarize the following summarized chunks into a concise, readable summary:

{combined_text}
"""
    final_response = ollama.chat(
        model=model_name,
        messages=[{"role": "user", "content": final_prompt}]
    )

    final_summary = (
        final_response.get("text") or
        final_response.get("content") or
        getattr(final_response, "message", {}).get("content") or
        str(final_response)
    )

    print(json.dumps({"summary": final_summary.strip()}))

except Exception as e:
    print(json.dumps({"summary": "", "error": str(e)}))

