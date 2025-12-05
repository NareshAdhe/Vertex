import axios from 'axios';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

// API Calls
export const fetchAllQuestions = async () => {
  const response = await axios.get(`${BACKEND_URI}/api/questions`, {
    withCredentials: true
  });
  return response.data;
};

export const fetchAllSubjects = async () => {
  const response = await axios.get(`${BACKEND_URI}/api/questions/subjects`, {
    withCredentials: true
  });
  return response.data;
};

export const fetchAllChapters = async () => {
  const response = await axios.get(`${BACKEND_URI}/api/questions/chapters`, {
    withCredentials: true
  });
  return response.data;
};

export const fetchQuestionById = async (id) => {
  const response = await axios.get(`${BACKEND_URI}/api/questions/${id}`, {
    withCredentials: true
  });
  return response.data;
};

export const createQuestion = async (formData) => {
  const response = await axios.post(`${BACKEND_URI}/api/questions`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const filterQuestions = (questions, filters) => {
  return questions.filter(q => {
    if (filters.subject){
      if(q.subject?.name !== filters.subject) return false;
    }
    if (filters.chapter){
      if(q.chapter?.name !== filters.chapter) return false;
    }
    if (filters.branch){
      if(q.branch !== filters.branch) return false;
    }
    if (filters.year){
      if(q.year !== parseInt(filters.year)) return false;
    }
    if (filters.semester){
      if(q.semester !== parseInt(filters.semester)) return false;
    }
    if (filters.examSession){
      if(q.examSession !== filters.examSession) return false;
    }
    if (filters.questionType){
      if(q.questionType !== filters.questionType) return false;
    }
    if (filters.difficulty){
      if(q.difficulty !== filters.difficulty) return false;
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        q.text.toLowerCase().includes(searchLower) ||
        q.subject?.name?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};
