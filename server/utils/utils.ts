import axios from "axios";
import { sign } from "jsonwebtoken";
export const getTokensGoogle = async (code: string, isTutor: boolean) => {
    try {
        const url = "https://oauth2.googleapis.com/token";
        const options = {
            code: code,
            client_id: process.env.GOOGLE_CLIENT_ID as string,
            client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirect_uri: isTutor
                ? (process.env.GOOGLE_TUTOR_REDIRECT_URI as string)
                : (process.env.GOOGLE_STUDENT_REDIRECT_URI as string),
            grant_type: "authorization_code",
        };

        const querySearch = new URLSearchParams(options);

        const tokens = await axios({
            method: "post",
            url: url,
            data: querySearch.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return tokens.data;
    } catch (err: any) {
        throw Error(err);
    }
};

export const getGoogleStudent = async (id_token: string, access_token: string) => {
    try {
        const student = await axios({
            method: "get",
            url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return student;
    } catch (err: any) {
        throw new Error(err);
    }
};

export const signToken = (id: string, isTutor: boolean) => {
    return sign(
        { id: id, isTutor: isTutor },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "24h",
            algorithm: "HS256",
        }
    );
};
