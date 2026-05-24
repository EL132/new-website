import { feature } from 'topojson-client';
import worldCountries from 'world-atlas/countries-110m.json';

export const countryFeatures = feature(
    worldCountries,
    worldCountries.objects.countries
).features;
