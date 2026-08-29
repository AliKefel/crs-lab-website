export interface Sponsor {
  name: string;
  logo: string;
  href?: string;
}

// Funding agencies acknowledged on the lab's previous site. Add a fifth
// entry here (with a matching logo file in public/sponsors/) if there's
// another sponsor to credit — the strip on the homepage renders whatever
// is in this list.
export const sponsors: Sponsor[] = [
  {name: 'Arizona State University', logo: '/branding/asu.png', href: 'https://www.asu.edu/'},
  {
    name: 'Air Force Office of Scientific Research',
    logo: '/sponsors/AFSOR.png',
    href: 'https://www.afrl.af.mil/AFOSR/',
  },
  { name: 'National Science Foundation', logo: '/sponsors/NSF.png', href: 'https://www.nsf.gov' },
  { name: 'NASA', logo: '/sponsors/nasa.png', href: 'https://www.nasa.gov' },
  { name: 'Office of Naval Research', logo: '/sponsors/ONR.png', href: 'https://www.onr.navy.mil' },
];
