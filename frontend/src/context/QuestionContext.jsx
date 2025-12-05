import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAllQuestions, fetchAllSubjects, fetchAllChapters } from "../utils/questionService";

const QuestionContext = createContext(null);

export const useQuestions = () => {
    const context = useContext(QuestionContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
};

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Questions
                const questionsRes = await fetchAllQuestions();
                if (questionsRes.success) {
                    setQuestions(questionsRes.data);
                } else {
                    toast.error(questionsRes.message);
                }

                // Fetch Subjects
                const subjectsRes = await fetchAllSubjects();
                if (subjectsRes.success) {
                    setSubjects(subjectsRes.data);
                }

                // Fetch Chapters
                const chaptersRes = await fetchAllChapters();
                if (chaptersRes.success) {
                    setChapters(chaptersRes.data);
                }

            } catch (error) {
                console.error(error);
                toast.error("Error fetching data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const value = {
        questions,
        subjects,
        chapters,
        loading
    };

    return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}