import sys
import json
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
def load_data(filepath):
    return pd.read_csv(filepath)

# Vectorize course titles and compute similarity matrix
def vectorize_courses(course_titles):
    count_vect = CountVectorizer()
    course_matrix = count_vect.fit_transform(course_titles)
    return cosine_similarity(course_matrix)

# Get course recommendations
def get_course_recommendations(role, courses_df, similarity_matrix, top_n=5):
    if role not in courses_df['course_title'].values:
        suggested_courses = courses_df[courses_df['course_title'].str.contains(role, case=False, na=False)]
        if suggested_courses.empty:
            return json.dumps({"error": "No relevant courses found."})

        return json.dumps(suggested_courses[['course_title', 'url']].head(top_n).to_dict(orient="records"))

    role_index = courses_df[courses_df['course_title'] == role].index[0]
    similarity_scores = list(enumerate(similarity_matrix[role_index]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    recommended_indices = [i[0] for i in similarity_scores[1:top_n+1]]
    recommended_courses = courses_df.iloc[recommended_indices]
    
    return json.dumps(recommended_courses[['course_title', 'url']].to_dict(orient="records"))

# Main function to be called from Node.js
if __name__ == "__main__":
    role = sys.argv[1]  # Get role from command-line argument
    df = load_data("data/udemy_course_data.csv")
    cosine_sim = vectorize_courses(df['course_title'])
    
    recommendations = get_course_recommendations(role, df, cosine_sim)
    print(recommendations)  # Print JSON result
