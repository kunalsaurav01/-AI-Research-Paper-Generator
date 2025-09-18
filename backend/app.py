from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import requests

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyBKxF_fg9J0nsiA2x2gcuTUlQ-oYMkry4c"
genai.configure(api_key=GEMINI_API_KEY)

# Search academic papers using Semantic Scholar API
def search_academic_papers(topic, max_results=3):
    url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={topic}&limit={max_results}&fields=title,abstract,url,year"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get("data", [])
    return []

# Generate research paper using Gemini
def generate_paper_with_citations(topic, focus_area, paper_type, papers):
    model = genai.GenerativeModel("gemini-1.5-flash")

    citations_text = "\n".join([f"- {p['title']} ({p['year']}): {p.get('url', '')}" for p in papers])
    prompt = f"""
    Write a two-page {paper_type} on the topic: '{topic}' with focus area '{focus_area}'.
    Use the following academic papers as references:
    {citations_text}
    Include proper headings, introduction, body, conclusion, and a references section.
    """

    response = model.generate_content(prompt)
    return response.text

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    topic = data.get("topic", "")
    focus_area = data.get("focus_area", "general")
    paper_type = data.get("paper_type", "Research Paper")

    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    # Step 1: Search academic papers
    papers = search_academic_papers(topic)

    # Step 2: Generate research paper with citations
    paper_text = generate_paper_with_citations(topic, focus_area, paper_type, papers)

    return jsonify({
        "paper": paper_text,
        "references": papers
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
