import Image from 'next/image';
import {LanguageLevels, StringElem} from "@/lib/interfaces";
import {Calendar, Download, Flag, LucideMail, MapPin} from "lucide-react";

export interface Author {
    avatar_path: string;
    cv_file_path: string;
    name: string;
    birth_date: string;
    email: string;
    location: string;
    languages: {
        id?: string | number;
        name: string;
        level: LanguageLevels;
    }[];
    tags: StringElem[];
}

export function IdentityCard({name, email, birth_date, location, avatar_path, cv_file_path, languages, tags}: Author) {

    return (
        <div className="card bg-base-200 shadow-sm p-5 sm:p-7 w-[95%] md:w-fit">
            <div className="flex justify-center w-full">
                <h2 className="card-title text-secondary text-xl sm:text-2xl">{name}</h2>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3">
                <Image
                    className="mask mask-hexagon-2 w-32 md:w-48 lg:w-64"
                    quality="100"
                    src={avatar_path}
                    alt="author picture"
                    width={600}
                    height={800}/>


                <ul className="list sm:py-3">
                    {/*Author Nationality*/}
                    <li className="list-row">
                        <Flag />
                        <span className="value">French</span>
                    </li>

                    {/*Author Birthdate*/}
                    <li className="list-row">
                        <Calendar />
                        <span className="value">{birth_date}</span>
                    </li>

                    {/*Author Email*/}
                    <li className="list-row">
                        <LucideMail />
                        <span className="value">{email}</span>
                    </li>

                    {/*Author Location*/}
                    <li className="list-row">
                        <MapPin />
                        <span className="value">{location}</span>
                    </li>
                </ul>
            </div>
            <div className="flex flex-row pt-1">
                <div className="grow flex-initial">
                    <div className="flex w-full justify-end sm:pt-1">
                        <a href={cv_file_path} className="btn btn-secondary btn-md sm:btn-lg rounded">
                            <Download />
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}