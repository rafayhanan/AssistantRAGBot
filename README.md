# Data Assistant RAG Bot

This chatbot allows the user to upload their private pdf files and can answer queries related to it.

<img width="959" alt="image" src="https://github.com/user-attachments/assets/7196ad0c-7057-4a00-9c91-b6463a26f5fc" />

## Getting Started

### 1. Clone Repository

  ```sh
    git clone https://github.com/rafayhanan/Data-Assistant-RAGBot.git
  ```

### 2. Install Dependencies

  - Next.js
    
    ```sh
      cd data-assistant
      npm i
    ```
    
  - Python
    
    ```sh
        cd data-assistant\flask-backend
        pip install -r requirements.txt
    ```

    OR

  - Setup Python Virtual Environment (Optional)

    ```sh
      cd data-assistant\flask-backend
      python -m venv .venv
      .venv\Scripts\activate
      pip install -r requirements.txt
    ```

### 3. LLM API Key
  Get API Key from Groq Cloud. Then create a ".env" file in the flask-backend directory.

  ```sh
    GROQ_API_KEY = <your-key-here>
  ```

## Run the Project

### Initialize backend

  ```sh
    cd data-assistant\flask-backend
    .venv\Scripts\activate
    python server.py
  ```

### Initialize frontend

  ```sh
    cd data-assistant
    npm run dev
  ```
