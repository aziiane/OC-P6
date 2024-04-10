import PhotographerImage from './photographerImages.js';
import PhotographerVideo from './photographerVideos.js';
export default class Media {
    constructor(data){
        this.data = data
        this.likes = data.likes
        if (this.data.image) {
            return new PhotographerImage(this.data);
        }
        else if (this.data.video) {
            return new PhotographerVideo(this.data);
        }
    }
}