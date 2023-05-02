const formEl = document.getElementById("form")
const passwordEl = document.getElementById("password")
const usernameEl = document.getElementById("username")


async function digestData(data) {
    const encoder = new TextEncoder()
    const encodedData = encoder.encode(data)
    const hash = await window.crypto.subtle.digest("SHA-256", encodedData)
    return buf2hex(hash);
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}


formEl.onsubmit = (e) => {

    e.preventDefault()

    const password = passwordEl.value
    const username = usernameEl.value

    digestData(password)
        .then(hash => {
            fetch(
                window.location.href,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            username: username,
                            password: hash,
                        }
                    )

                }
            )
                .then(
                    x => location.href = window.location.origin
                )
        })

    return false
}


digestData("simen")
    .then(x => console.log(x))
