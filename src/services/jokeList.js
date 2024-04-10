export const getAllJokes = async () => {
    return await fetch(`http://localhost:8088/jokes`).then((res) => res.json())
}
export const postJoke = async (defaultState) => { //performing an asynchronus opperation
    const postOptions = { // an object called postOptions which contains configuration options for making a post request
        method: "POST", //used to send data to the server to create a new resource
        headers: {
            "Content-Type": "application/json" // specifies the format of the value being sent / indicates that the request body contains json data
        },
        body: JSON.stringify(defaultState) //the body is set to the json representation of the transient state object
    }
    return await fetch(`http://localhost:8088/jokes`, postOptions).then((res) => res.json())
}

export const updateJokeTold = async (jokeId, jokeObject) => { //performing an asynchronus opperation
    const putOptions = { // an object called postOptions which contains configuration options for making a post request
        method: "PUT", //used to send data to the server to create a new resource
        headers: {
            "Content-Type": "application/json" // specifies the format of the value being sent / indicates that the request body contains json data
        },
        body: JSON.stringify(jokeObject) //the body is set to the json representation of the transient state object
    }
    return await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions).then((res) => res.json())
}

export const deleteJoke = async (jokeId, jokeObject) => {
    const deleteOptions = {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObject)

    }
    return await fetch(`http://localhost:8088/jokes/${jokeId}`, deleteOptions).then((res) => res.json())
}
