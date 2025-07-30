import Image from 'next/image';
import {LanguageLevels, StringElem} from "@/lib/interfaces";
import {Calendar, Download, Flag, LucideLocate, LucideMail, MapPin} from "lucide-react";

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

                    {/*<ul className="list">*/}

                    {/*    /!*Author Languages*!/*/}
                    {/*    <li className="list-col sm:list-row">*/}
                    {/*        <div className="flex flex-col sm:flex-row sm:justify-around">*/}
                    {/*            <span className="label min-w-20">Languages: </span>*/}
                    {/*            <ul className="list gap-2">*/}
                    {/*                {languages.map((language) => (*/}
                    {/*                    <li key={language.id} className="list-row">*/}
                    {/*                        <div className="join join-vertical md:join-horizontal gap-3">*/}
                    {/*                            <span className="text-md">{language.name}</span>*/}
                    {/*                            <span*/}
                    {/*                                className="badge badge-primary badge-sm sm:badge-md">{language.level}</span>*/}
                    {/*                        </div>*/}
                    {/*                    </li>*/}
                    {/*                ))}*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </li>*/}
                    {/*    <li className="divider"></li>*/}

                    {/*    /!*Author Skill Tags*!/*/}
                    {/*    <li className="list-col sm:list-row">*/}
                    {/*        <div className="flex flex-col sm:flex-row sm:justify-around">*/}
                    {/*            <span className="label min-w-20">Skills: </span>*/}
                    {/*            <ul className="list gap-2">*/}
                    {/*                {tags.map((tag) => (*/}
                    {/*                    <li key={tag.id} className="list-row">*/}
                    {/*                        <span className="badge badge-primary badge-sm sm:badge-md gap-3">{tag.value}</span>*/}
                    {/*                    </li>*/}
                    {/*                ))}*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
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

export function OldIdentityCard({name, email, birth_date, location, avatar_path, cv_file_path, tags}: Author) {

    return (
        <div className="card-resume">

            {/*Top Stripe*/}
            <div className="top-stripe">
                <span className="nationality">French nationality</span>
            </div>

            {/*Middle Stripe*/}
            <div className="middle-stripe">

                {/*Author Photo*/}
                <div className="resume-photo">
                    <Image
                        quality="100"
                        src={avatar_path}
                        alt="author picture"
                        className="photo"
                        width={600}
                        height={800}/>
                </div>

                {/*Main Content*/}
                <div className="resume-main relative">

                    {/*RF Background*/}
                    <span className="rf-background">RF</span>

                    {/*Author Name*/}
                    <div className="resume-line">
                        <span className="label">Name: </span>
                        <span className="value">{name}</span>
                    </div>

                    {/*Author Birthdate*/}
                    <div className="resume-line">
                        <span className="label">Birthdate: </span>
                        <span className="value">{birth_date}</span>
                    </div>

                    {/*Author Email*/}
                    <div className="resume-line">
                        <span className="label">Email: </span>
                        <span className="value">{email}</span>
                    </div>

                    {/*Author Location*/}
                    <div className="resume-line">
                        <span className="label">Location: </span>
                        <span className="value">{location}</span>
                    </div>

                    {/*Author Skill Tags*/}
                    <div className="resume-tags">
                        {tags.map((tag) => (
                            <div key={tag.id} className="tag"><span className="tag-text">{tag.value}</span></div>
                        ))}
                    </div>
                </div>
            </div>

            {/*Bottom Stripe*/}
            <div className="bottom-stripe">

                <div className="cv-download-btn relative">
                    <a href={cv_file_path} target="_blank" className="abs full on-top"></a>
                    <Image
                        src="/img/download-icon.svg"
                        alt="download icon"
                        className="btn-icon"
                        width={80}
                        height={80}/>
                    <span className="btn-txt">Download CV</span>
                </div>
            </div>

        </div>
    )
}