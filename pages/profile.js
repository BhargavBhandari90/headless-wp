import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import { getCurrentUser } from "../components/current-user";
import React, { useState, useEffect } from 'react'


export default function UserProfile(props) {

    let ignore = false;

    const session = useSession();

    const [ userSession, setSession ] = useState({session});

    const [ currentUser, setCurrentUser ] = useState({
        name: 'Loading...',
    });

    console.log('userSession',userSession);

    useEffect(() => {

        console.log('userSession11',userSession);

        // setSession(userSession);

        const currentuser = getCurrentUser(userSession).then(result => {
            console.log(result);
            if (result) {
                setSession(userSession);
                setCurrentUser(result);
            }
        });

        return () => currentuser;

    },[userSession]);

    console.log('currentuser-uf',currentUser);

    return (
        <Layout>
            <section className="text-gray-400 bg-gray-900 body-font">
              <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
              { currentUser?.avatar_urls ?
                ( <img
                  className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                  alt="hero"
                  src={currentUser.avatar_urls['96']}
                  width={100}
                  height={100}
                /> ) : null
              }
                <div className="text-center lg:w-2/3 w-full">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  {currentUser.name}
                  </h1>
                  {/* <p className="leading-relaxed mb-8">
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                  </p> */}
                </div>
              </div>
            </section>
        </Layout>
    )
}