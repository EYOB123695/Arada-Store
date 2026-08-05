export interface LoginCredentials { 
    email :string ; 
    password : string ;
}

export interface RegisterCredentials { 
    name:string ; 
    email : string ; 
    password :string  ; 
    avatar ? : string ;
}

export interface AuthTokens  { 
    access_token: string;
    refresh_token: string;

}

const PLATZI_BASE_URL = "https://api.escuelajs.co/api/v1"; 


/** 

 *login user via platzi
*/ 

export async function platziLogin(credentials: LoginCredentials) : Promise<AuthTokens> {
    
   const response = await fetch(`${PLATZI_BASE_URL}/auth/login`,{method:"POST", headers : {"content-Type" : "application/json"},
   body :JSON.stringify(credentials),



}) ;


if(!response.ok){

     const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Invalid credentials. Please try again.");
  }
  return response.json(); // Returns { access_token, refresh_token }

    
} 


/**
 * 2. Register new user via Platzi Fake Store API
 */
export async function platziRegister(credentials: RegisterCredentials) {
  const response = await fetch(`${PLATZI_BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...credentials,
      avatar: credentials.avatar || "https://picsum.photos/800",
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed. Email may already be registered.");
  }
  return response.json();
}
export interface UserProfile { 
  id: number ; 
  email :string ; 
  name : string ; 
  role :string ; 
  avatar :string ;
}



export async function getUserProfile(accessToken: string) : Promise<UserProfile> {

  const response = await fetch(`${PLATZI_BASE_URL}/auth/profile`, {
     method: "GET",  
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // 💬 Attaches the JWT token into the Authorization Bearer header
    },

  });

   if (!response.ok) {
    // 💬 Checks if the response HTTP status code is not 200 OK
    throw new Error("Session expired or invalid authentication token.");
    // 💬 Throws an explicit error when authentication fails or token is expired
  }
  return response.json();
  

}
