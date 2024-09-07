export interface TFacility {
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
    isDeleted: boolean;
    image: string; // Optional field for the image URL or path
}
