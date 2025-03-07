
// /actions/user-auth.ts
export async function login(username: string, password: string) {

    const res = await fetch(`http://ec2-3-25-64-140.ap-southeast-2.compute.amazonaws.com:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    // console.log(res);
    return res;
  }
  
  export async function refresh(refreshToken: string) {
    console.log("Token refreshing in client")
    const res = await fetch(`http://ec2-3-25-64-140.ap-southeast-2.compute.amazonaws.com:5000/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
  
    return res;
  }