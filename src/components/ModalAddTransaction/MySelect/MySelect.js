// import { useField, useFormik, useFormikContext } from 'formik';
// import { useEffect } from 'react';
// import * as yup from 'yup';
// import { MenuItem, Select } from '@mui/material';
//
//
//
// const MySelect = (props) => {
//
//   const validationSchema = yup.object({
//     category: yup
//       .string()
//       .required('Category is required'),
//   })
//
//   const formik = useFormik({
//     initialValues: {
//       category: '',
//     },
//     validationSchema: validationSchema,
//   })
//
//   const {
//     values: {type},
//     setFieldValue
//   } = useFormikContext();
//   const [field, meta] = useField(props);
//
//   useEffect(() => {
//     if (!type) {
//       setFieldValue(props.name, `IrregularIncome`);
//     }
//   }, [type, setFieldValue, props.name]);
//
//   return (
//
//   );
// };
//
// export default MySelect;