import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // استيراد التنسيق الافتراضي
import { Box, Typography } from '@mui/material';

const QuillTextInput = ({ value, onChange, label }) => {
  
  // تحديد الأزرار التي تريد ظهورها في شريط الأدوات
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'], // التنسيقات الأساسية
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean'] // زر مسح التنسيق
    ],
  };

  return (
    <Box sx={{
      width: '100%',
      // تخصيص الـ CSS الخاص بـ Quill ليتناسب مع Material-UI
      '& .ql-toolbar.ql-snow': {
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        borderColor: 'rgba(0, 0, 0, 0.23)', // لون حواف MUI الافتراضي
        backgroundColor: '#f5f5f5',
      },
      '& .ql-container.ql-snow': {
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        minHeight: '150px',
        fontSize: '1rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      // تأثير عند تمرير الماوس فوق الحقل (Hover)
      '& :hover .ql-toolbar, & :hover .ql-container': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
      // تنسيق الكتابة باللغة العربية داخل المحرر
      '& .ql-editor': {
        direction: 'rtl',
        textAlign: 'right',
        minHeight: '250px',
      }
    }}>
      {label && (
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}>
          {label}
        </Typography>
      )}
      
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
      />
    </Box>
  );
};

export default QuillTextInput;