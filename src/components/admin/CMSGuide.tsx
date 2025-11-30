import { Card, CardContent } from '../ui/card';
import { Smartphone, Camera, FileText, Image, CheckCircle, Info } from 'lucide-react';

export function CMSGuide() {
  return (
    <Card className="border-2 border-[#C9A961] bg-gradient-to-r from-[#FFF9E6] to-[#FFF0F5]">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#0A1929] mb-2 font-['Montserrat']">💡 How to Upload Images from Mobile</h3>
            <div className="space-y-3 text-sm font-['Inter'] text-gray-700">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C9A961] text-white flex items-center justify-center flex-shrink-0 text-xs">1</div>
                <p>
                  <strong>Tap the upload area</strong> - Click the dashed box that says "Upload Image from Device" or "Upload Featured Image from Device"
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C9A961] text-white flex items-center justify-center flex-shrink-0 text-xs">2</div>
                <p>
                  <strong>Choose your source</strong> - Your device will ask: "Take Photo" (camera) or "Choose from Gallery"
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C9A961] text-white flex items-center justify-center flex-shrink-0 text-xs">3</div>
                <p>
                  <strong>See preview</strong> - Your image will appear immediately. If you don't like it, click the red X to try again
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C9A961] text-white flex items-center justify-center flex-shrink-0 text-xs">4</div>
                <p>
                  <strong>Fill other details</strong> - Add title, description, category, etc.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C9A961] text-white flex items-center justify-center flex-shrink-0 text-xs">5</div>
                <p>
                  <strong>Submit</strong> - Click "Add Image" or "Create Post" - your content appears instantly on the website!
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#C9A961]/30 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Maximum file size: 5MB</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Supported formats: JPG, PNG, WebP</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Images stored locally in browser</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No backend needed - instant updates</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
