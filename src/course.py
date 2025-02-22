from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and preprocess data
df = pd.read_csv(r"C:\Users\Admin\Desktop\CARRER NAVIGATOR\career-navigator\src\assets\Coursera.csv").dropna()
df['combined_features'] = df['Course Name'] + ' ' + df['Course Description'] + ' ' + df['Skills']

def recommend_courses(role, top_n=5):
    """Recommend courses based on career role."""
    role_skills = {
        'Data Scientist': 'Machine Learning Python Statistics AI',
        'Database Administrator': 'SQL Database Management Oracle',
    }

    if role not in role_skills:
        return []

    role_query = role_skills[role]
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['combined_features'].tolist() + [role_query])
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    role_index = len(df)
    sim_scores = list(enumerate(cosine_sim[role_index][:-1]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    selected_indices = [i[0] for i in sim_scores[:top_n]]

    return df.iloc[selected_indices][['Course Name', 'Course URL']].to_dict(orient='records')

@app.route('/recommend', methods=['GET'])
def get_recommendations():
    role = request.args.get('role', '').strip()
    num = int(request.args.get('num', 5))

    recommendations = recommend_courses(role, num)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)

