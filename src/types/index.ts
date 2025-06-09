export interface Contact {
  icon: string;
  title?: string;
  titleKey?: string;
  value?: string;
  valueKey?: string;
  link?: string;
}

export interface Social {
  platform: string;
  icon: string;
  url: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Technology {
  icon: string;
  name: string;
  title?: string;
  achievement?: string;
}

export interface ExpertiseArea {
  name: string;
  achievement?: string;
}

export interface Testimonial {
  avatar: string;
  name: string;
  title: string;
  text: string;
}

export interface Education {
  timeframe: string;
  degree: string;
  institution: string;
  description: string;
}

export interface Experience {
  timeframe: string;
  position: string;
  company: string;
  description: string;
}

export interface Project {
  category: string;
  title: string;
  image: string;
  description?: string;
}

export interface PersonalInfo {
  name: string;
  avatar: string;
  title: string;
  aboutMe: string[];
  contacts: Contact[];
  socials: Social[];
}

export interface Portfolio {
  personalInfo: PersonalInfo;
  services: Service[];
  technologies: Technology[];
  expertiseAreas: ExpertiseArea[];
  skills: {
    technical: Skill[];
    soft: Skill[];
  };
  testimonials: Testimonial[];
  resume: {
    education: Education[];
    experience: Experience[];
  };
  projects: Project[];
} 