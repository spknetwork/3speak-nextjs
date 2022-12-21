import mongoose from "mongoose";

const PodcastSettingsSchema = new mongoose.Schema({
  podcast_title: String,
  podcast_owner: String,
  podcast_description: String,
  podcast_image: String,
  podcast_categories: Array,
  podcast_languages: Array
});

export default mongoose.models.PodcastSettings || mongoose.model('PodcastSettings', PodcastSettingsSchema)
