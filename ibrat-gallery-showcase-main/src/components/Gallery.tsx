import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Import images
import mockTrialOpening from '@/assets/mock-trial-opening.jpg';
import crossExamination from '@/assets/cross-examination.jpg';
import teamDiscussion from '@/assets/team-discussion.jpg';
import workshopScene from '@/assets/workshop-scene.jpg';
import judgesPanel from '@/assets/judges-panel.jpg';
import behindScenes from '@/assets/behind-scenes.jpg';
import audienceEngagement from '@/assets/audience-engagement.jpg';

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
  category: 'courtroom' | 'workshops' | 'behind-scenes';
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: mockTrialOpening,
    caption: 'Opening Statements',
    category: 'courtroom',
    alt: 'Students presenting opening statements in mock trial courtroom'
  },
  {
    id: '2',
    src: crossExamination,
    caption: 'Cross Examination',
    category: 'courtroom',
    alt: 'Young attorney conducting cross examination of witness'
  },
  {
    id: '3',
    src: teamDiscussion,
    caption: 'Team Strategy',
    category: 'behind-scenes',
    alt: 'Students collaborating on legal strategy and case preparation'
  },
  {
    id: '4',
    src: workshopScene,
    caption: 'Legal Workshop',
    category: 'workshops',
    alt: 'Educational workshop teaching legal concepts to students'
  },
  {
    id: '5',
    src: judgesPanel,
    caption: 'Judicial Review',
    category: 'courtroom',
    alt: 'Panel of judges evaluating mock trial performance'
  },
  {
    id: '6',
    src: behindScenes,
    caption: 'Preparation & Coaching',
    category: 'behind-scenes',
    alt: 'Behind the scenes preparation and mentoring session'
  },
  {
    id: '7',
    src: audienceEngagement,
    caption: 'Audience Engagement',
    category: 'courtroom',
    alt: 'Engaged audience observing mock trial proceedings'
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'courtroom', label: 'Courtroom' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'behind-scenes', label: 'Behind the Scenes' },
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold serif-heading text-primary mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Witness the power of youth-led legal education through compelling moments 
            of advocacy, teamwork, and judicial excellence.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-scale-in">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`filter-button ${
                selectedCategory === category.id ? 'active' : 'inactive'
              }`}
              variant="ghost"
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openLightbox(image)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="gallery-caption">{image.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95 border-none">
            {selectedImage && (
              <div className="relative w-full h-full flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="w-6 h-6" />
                </Button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-semibold text-accent mb-2">
                    {selectedImage.caption}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {selectedImage.alt}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;