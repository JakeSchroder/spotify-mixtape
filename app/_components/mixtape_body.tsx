import { Formik, Field, Form } from 'formik';

export default function MixtapeBody(){
    return(
        <div className=" flex flex-col items-center space-y-4 p-6 min-h-screen">
            <Formik       
                initialValues={{
                    category: 'tracks',
                    time: 'month',
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
            {({ values }) => (
                <Form className=" flex flex-col items-center space-y-4 p-6 ">
                    <h1 className=" text-4xl ">Your Most Niche</h1>
                    <div className=" flex flex-row " role='group'>
                        <label className={values.category === 'tracks' ? 'btn-filter-checked':'btn-filter-unchecked'}>
                            <Field className='appearance-none' type='radio' value='tracks' name='category'/>
                            Tracks
                        </label>
                        <label className={values.category === 'artists' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='artists' name='category'/>
                            Artists
                        </label>
                    </div>
                    <h1 className=" text-4xl ">Within the Last</h1>

                    <div className=" flex flex-row" role='group'>
                        <label className={values.time === 'month' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='month' name='time'/>
                            Month
                        </label>
                        <label className={values.time === '6months' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='6months' name='time'/>
                            6 Months
                        </label>
                        <label className={values.time === 'year' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='year' name='time'/>
                            Year
                        </label>
                        <label className={values.time === 'all_time' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='all_time' name='time'/>
                            All Time
                        </label>
                    </div>
                    <div>Category: {values.category} Time: {values.time}</div>
                </Form>
            )}
            </Formik>
            <h1>Nichify content</h1>
            <button className=" btn-spotify">Download Image</button>
            <button className=" btn-spotify">Share</button>
        </div>
    )
}