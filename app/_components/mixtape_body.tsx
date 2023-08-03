'use client'
import { Formik, Field, Form } from 'formik';
import { useEffect } from 'react';
import { getUserPlaylists } from '../_lib/get_mixtape';
import { RequestAccessToken } from "../_lib/pkce_spotify_auth";

export default function MixtapeBody(){
    // UseEffect calls api every time 'values' changes
    useEffect(()=>{
        RequestAccessToken();
        getUserPlaylists();
    })
    let mixtapeOneMonth = JSON.parse(localStorage.getItem('mixtapeOneMonth') || '{}');
    let mixtapeSixMonths = JSON.parse(localStorage.getItem('mixtapeSixMonths') || '{}');
    let mixtapeOneYear = JSON.parse(localStorage.getItem('mixtapeOneYear') || '{}');
    let mixtapeAllTime = JSON.parse(localStorage.getItem('mixtapeAllTime') || '{}');
    interface TrackProvider {
        name:string,
        artist:string
    }
        
    return(
        <div className=" flex flex-col items-center space-y-4 p-6 min-h-screen">
            <Formik       
                initialValues={{
                    category: 'tracks',
                    time_frame: 'month',
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
            {({ values }) => (
                <Form className=" flex flex-col items-center space-y-4 p-6 ">
                    <h1 className=" text-4xl text-center">Your Most Niche</h1>
                    <div className=" flex flex-row space-x-2" role='group'>
                        <label className={values.category === 'tracks' ? 'btn-filter-checked':'btn-filter-unchecked'}>
                            <Field className='appearance-none' type='radio' value='tracks' name='category'/>
                            Tracks
                        </label>
                        <label className={values.category === 'artists' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='artists' name='category'/>
                            Artists
                        </label>
                    </div>
                    <h1 className=" text-4xl text-center">Within the Last</h1>

                    <div className=" grid grid-flow-col grid-rows-1 gap-4 sm:grid-rows-2 sm:flex-row" role='group'>
                        <label className={values.time_frame === 'month' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='month' name='time_frame'/>
                            Month
                        </label>
                        <label className={values.time_frame === '6months' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='6months' name='time_frame'/>
                            6 Months
                        </label>
                        <label className={values.time_frame === 'year' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='year' name='time_frame'/>
                            Year
                        </label>
                        <label className={values.time_frame === 'all_time' ? 'btn-filter-checked':'btn-filter-unchecked'} >
                            <Field className='appearance-none' type='radio' value='all_time' name='time_frame'/>
                            All Time
                        </label>
                    </div>
                    {(values.time_frame =='month') &&
                        mixtapeOneMonth.map((track:TrackProvider,index:number)=>{
                            return(
                                <div className='flex gap-2' key={index}>
                                    {values.category =='tracks'? <h1>{track.name} - {track.artist}</h1>:<h1>{track.artist}</h1>}
                                </div>
                            )
                        })
                    }
                    {(values.time_frame =='6months') &&
                        mixtapeSixMonths.map((track:TrackProvider,index:number)=>{
                            return(
                                <div className='flex gap-2' key={index}>
                                    {values.category =='tracks'? <h1>{track.name} - {track.artist}</h1>:<h1>{track.artist}</h1>}
                                </div>
                            )
                        })
                    }
                    {(values.time_frame =='year') &&
                        mixtapeOneYear.map((track:TrackProvider,index:number)=>{
                            return(
                                <div className='flex gap-2' key={index}>
                                    {values.category =='tracks'? <h1>{track.name} - {track.artist}</h1>:<h1>{track.artist}</h1>}
                                </div>
                            )
                        })
                    }
                    {(values.time_frame =='all_time') &&
                        mixtapeAllTime.map((track:TrackProvider,index:number)=>{
                            return(
                                <div className='flex gap-2' key={index}>
                                    {values.category =='tracks'? <h1>{track.name} - {track.artist}</h1>:<h1>{track.artist}</h1>}
                                </div>
                            )
                        })
                    }
                </Form>
            )}
            </Formik>
            <button className=" btn-spotify">Share</button>
            <button className=" btn-spotify">Download Image</button>
            <button className=" btn-spotify">Log Out</button>
        </div>
    )
}