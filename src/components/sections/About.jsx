import React from 'react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: The Narrative */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-2">
              The "Why" Behind the Code
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Software fails when it ignores <span className="text-yellow-500">Business Logic.</span>
            </h2>
            
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                I noticed a gap in the Tanzanian market: Developers write great code, but they often don't understand the financial or operational goals of the business they are building for.
              </p>
              <p>
                With my background in <strong className="text-slate-900">Accounting & Finance</strong> and <strong className="text-slate-900">Business Administration</strong>, I don't just take tickets. I ask: <em>"How will this feature make money? How will it save time?"</em>
              </p>
              <p>
                I became a developer to bridge this gap—building systems that are not just bug-free, but profitable.
              </p>
            </div>
          </div>

          {/* RIGHT: The Visual Stats/Values */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 rounded-lg text-white">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Precision First</h3>
                  <p className="text-slate-600 mt-1">
                    Like in accounting, a single decimal point error in code can be a disaster. I code with financial precision.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-yellow-200 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500 rounded-lg text-white">
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Psychology Driven</h3>
                  <p className="text-slate-600 mt-1">
                     I use EQ to design interfaces that users naturally understand, reducing training time and frustration.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;