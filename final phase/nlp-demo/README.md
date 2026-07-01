# 🛡️ Arabic Fake News Detector — Egyptian Arabic NLP Project

A machine learning project for detecting fake news in **Egyptian Arabic tweets**, featuring a live interactive React demo. Three NLP models were trained and benchmarked, with the best achieving **91.24% accuracy**.

---

## 📖 Project Overview

Misinformation in Arabic social media is a growing challenge. This project addresses fake news detection specifically in the **Egyptian Arabic dialect** using Natural Language Processing (NLP) and machine learning techniques.

The system classifies tweets as **Real**, **Fake**, or **Uncertain**, and highlights the key linguistic signals that drove the decision.

---

## ✨ Features

- 🔍 **Interactive Demo** — Paste any Egyptian Arabic tweet and get an instant classification
- 📊 **Model Comparison** — Side-by-side benchmark of all three trained models
- 📝 **Example Tweets** — Pre-loaded real/fake examples to explore
- 🧠 **Signal Highlighting** — Shows which Arabic keywords triggered the real/fake scores
- 🕓 **Analysis History** — Keeps a running log of your recent analyses in-session

---

## 🤖 Models Trained

| Rank | Model | Accuracy | F1 Score |
|------|-------|----------|----------|
| 🥇 1 | **XGBoost + TF-IDF** | **91.24%** | 0.910 |
| 🥈 2 | BiLSTM + Word2Vec | 90.22% | — |
| 🥉 3 | AraBERT | 90.01% | 0.899 |

> **Best performer:** XGBoost with TF-IDF vectorization — fast, interpretable, and highly accurate.

---

## 🔧 NLP Preprocessing Pipeline

All text goes through the following steps before classification:

1. Remove URLs & mentions (`@user`, `http://...`)
2. Normalize Arabic letters (alef variants, ta marbuta, ya)
3. Remove tashkeel (Arabic diacritics)
4. Arabic stopword filtering
5. TF-IDF vectorization / tokenization

---

## 📂 Project Structure

```
Project/
├── Egypt_Fake_News_Detection.ipynb       # Main training notebook
├── nlp-project (1).ipynb                 # Exploratory analysis notebook
├── NLP project report.pdf               # Full project report
├── archive/
│   └── Egypt_Fake_Tweets_Labeled.xlsx   # Labeled dataset
└── final phase/
    ├── Arabic_Fake_News_Detection_in_Egypt_Using_NLP.pptx  # Slides
    ├── NLP_Project_Report.docx           # Project report (Word)
    ├── nlp_demo.jsx                      # Standalone demo component
    └── nlp-demo/                         # ← React web app (this repo)
        ├── src/
        │   ├── App.js                    # Main application component
        │   ├── App.css                   # Application styles
        │   └── index.js                  # Entry point
        ├── public/
        ├── package.json
        └── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Installation

```bash
# Navigate to the project folder
cd "final phase/nlp-demo"

# Install dependencies
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The optimized build will be output to the `build/` folder.

---

## 🗂️ Dataset

| Property | Detail |
|----------|--------|
| **File** | `Egypt_Fake_Tweets_Labeled.xlsx` |
| **Language** | Egyptian Arabic dialect |
| **Task** | Binary classification — Real vs. Fake |
| **Embeddings trained on** | ~2.5 million texts |

---

## 🧪 Demo vs. Production

| | Demo (this app) | Production |
|---|---|---|
| **Classifier** | Rule-based keyword scorer | XGBoost, AraBERT, BiLSTM |
| **Language** | Egyptian Arabic | Egyptian Arabic |
| **Purpose** | Interactive visualization | Full inference pipeline |
| **Accuracy** | Heuristic | 91.24% (XGBoost) |

> The interactive demo uses a lightweight keyword-matching heuristic for instant in-browser results. The real models (XGBoost, AraBERT, BiLSTM) are trained offline in the Jupyter notebooks.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Demo | React 19, JavaScript (JSX) |
| ML Models | XGBoost, BiLSTM, AraBERT |
| Vectorization | TF-IDF, Word2Vec |
| NLP Preprocessing | Custom Arabic pipeline |
| Notebooks | Jupyter / Python |

---

## 📄 License

This project was developed as an academic NLP project. All rights reserved.

---

## 👥 Authors

Egyptian Arabic Fake News Detection — NLP Course Project
