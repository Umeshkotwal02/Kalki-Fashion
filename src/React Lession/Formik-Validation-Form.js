// Form Validation With Formik 

// step 1 : import formik & yup from *
import * as formik from 'formik';
import * as yup from 'yup';

// step 2 : make formik function
const { Formik } = formik;

// step 3 : set schema as input field
const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

// step 4: call at top of below return and close at last of function return close
return (
    <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
            firstName: 'Mark',
            lastName: 'Otto',
            username: '',
            city: '',
            state: '',
            zip: '',
            terms: false,
        }}
    >
        {/*  Function UI Form UI */}
    </Formik>
)

// step 5 : add formik id to Form.Group as schema given controlId="validationFormik01"
// step 6 : add ({ handleBlur, touched, errors }) => { } as propers at function start
const MyComponent = ({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
    return (<> </>)
}
// add in form group : isValid={touched.lastName && !errors.lastName}

// step 7 : add noValidate in Form tag :
<Form noValidate onSubmit={handleSubmit}> abc </Form>

// step 8 : add Form.Control.Feedback at form control below

<Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>