# -*- coding: utf-8 -*-
"""LLama2multiagent_.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1c3mnagfqkJNdstRw8kNl5cFk7GPhI6jJ
"""

!CMAKE_ARGS="-DLLAMA_CUBLAS=on" FORCE_CMAKE=1 pip install llama-cpp-python==0.1.78 numpy==1.23.4 --force-reinstall --upgrade --no-cache-dir --verbose
!pip install huggingface_hub
!pip install langdetect
!pip install googletrans==4.0.0-rc1
!pip install matplotlib

from huggingface_hub import hf_hub_download
from llama_cpp import Llama
import matplotlib.pyplot as plt
from langdetect import detect
from googletrans import Translator

# Load LLaMA model
model_name_or_path = "TheBloke/Llama-2-13B-chat-GGUF"
model_basename = "llama-2-13b-chat.Q5_K_M.gguf"

# Download model
model_path = hf_hub_download(repo_id=model_name_or_path, filename=model_basename)

# Initialize LLaMA
lcpp_llm = Llama(
    model_path=model_path,
    n_threads=2,  # CPU cores
    n_batch=512,  # Batch size (depends on your GPU VRAM)
    n_gpu_layers=32  # Adjust based on VRAM
)

# Translator for multilingual support
translator = Translator()

# Progress tracking dictionary
student_progress = {}

# Function to detect language
def detect_language(text):
    return detect(text)

# Translation function
def translate_text(text, target_lang="en"):
    return translator.translate(text, dest=target_lang).text

# Progress visualization
def visualize_progress(student):
    topics = student_progress.get(student, {})
    labels = list(topics.keys())
    values = list(topics.values())

    plt.figure(figsize=(10, 6))
    plt.bar(labels, values, color="skyblue")
    plt.xlabel("Topics")
    plt.ylabel("Completion")
    plt.title(f"{student}'s Progress Overview")
    plt.xticks(rotation=45)
    plt.tight_layout()

    # Save the plot to a file
    plot_path = f"{student}_progress.png"
    plt.savefig(plot_path)
    plt.close()

    return plot_path


# Progress tracking function
def track_progress(student, topic):
    if student not in student_progress:
        student_progress[student] = {}
    student_progress[student][topic] = student_progress[student].get(topic, 0) + 1

def generate_response(prompt):
    response = lcpp_llm(
        prompt=prompt,
        max_tokens=1024,  # Adjust for detailed responses
        temperature=0.9,  # Creativity level
        top_p=0.95,  # Diversity in output
        repeat_penalty=1.2,
        top_k=100  # Token range restriction
    )
    return response["choices"][0]["text"].strip()

# Agents
def educational_support_agent(student, inquiry):
    prompt = f"""
    You are an advanced AI assistant with expertise in education.
    Your goal is to help {student} with detailed, well-structured responses.
    Inquiry: {inquiry}
    """
    return generate_response(prompt)

def educational_quality_assurance_agent(student, response_text):
    prompt = f"Review this response for {student}:\n{response_text}"
    return generate_response(prompt)

def content_verification_agent(student, response_text):
    prompt = f"Verify the accuracy of this response for {student}:\n{response_text}"
    return generate_response(prompt)

def feedback_agent(student, response_text):
    prompt = f"Provide feedback on the response for {student}:\n{response_text}"
    return generate_response(prompt)

def handle_inquiry(student, inquiry):
    # Detect and translate if necessary
    language = detect_language(inquiry)
    if language != "en":
        print(f"Detected language: {language}. Translating to English...")
        inquiry = translate_text(inquiry)

    # Simplistic topic extraction
    topic = inquiry.split()[0]  # Improve this as needed

    # Multi-agent responses
    support_response = educational_support_agent(student, inquiry).strip()
    qa_response = educational_quality_assurance_agent(student, support_response).strip()
    cv_response = content_verification_agent(student, qa_response).strip()
    fb_response = feedback_agent(student, cv_response).strip()

    # Track progress
    track_progress(student, topic)

    # Print final response
    final_response = (
        f"### Inquiry from {student}:\n{inquiry}\n\n"
        f"### Support Agent Response:\n{support_response}\n\n"
        f"### QA Review:\n{qa_response}\n\n"
        f"### Verification:\n{cv_response}\n\n"
        f"### Feedback:\n{fb_response}"
    )
    print(final_response)

    # Visualize progress
    visualize_progress(student)

if __name__ == "__main__":
    student_name = input("Enter the student's name: ")
    student_inquiry = input(f"Hi {student_name}, what would you like help with today?\n")

    handle_inquiry(student_name, student_inquiry)



