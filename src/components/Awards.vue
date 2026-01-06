<template>
  <section id="awards" class="py-20 bg-gray-900 text-white">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Certificate Display -->
        <div class="relative" data-aos="fade-right">
          <div class="bg-white p-8 rounded-lg shadow-2xl relative">
            <div class="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-br-full opacity-50"></div>
            <div class="absolute bottom-0 right-0 w-32 h-32 bg-pink-100 rounded-tl-full opacity-50"></div>
            
            <div class="relative z-10 text-gray-900">
              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-gray-700 mb-8">CSSWINNER</h3>
                <div class="flex justify-center mb-6">
                  <div class="relative">
                    <div class="w-32 h-32 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full flex items-center justify-center transform rotate-45">
                      <div class="transform -rotate-45 text-center">
                        <p class="text-xs font-bold">SITE OF THE</p>
                        <p class="text-2xl font-bold">MONTH</p>
                      </div>
                    </div>
                    <div class="absolute -left-4 top-8 transform -rotate-45">
                      <p class="text-xs font-bold">DEC</p>
                      <p class="text-sm font-bold">2015</p>
                    </div>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-6">
                  that the website Molamil.com has been awarded Site of the Month on December 2015, at csswinner.com
                </p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                  <span>2016 Official Certificate</span>
                  <span class="text-2xl font-bold">W</span>
                  <span>#CSSW10088</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Awards List -->
        <div data-aos="fade-left">
          <h2 class="text-5xl font-bold mb-8">Awards.</h2>
          <div class="space-y-6 max-h-96 overflow-y-auto pr-4">
            <div 
              v-for="(award, index) in awards" 
              :key="index"
              class="border-l-4 border-pink-500 pl-6 py-4"
              data-aos="fade-left"
              :data-aos-delay="index * 100"
            >
              <h3 class="text-xl font-bold mb-2">{{ award.title }}</h3>
              <p class="text-gray-400">{{ award.status }}</p>
              <p class="text-pink-400 font-semibold">{{ award.period }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const awards = [
  {
    title: 'Awwwards.com',
    status: 'Winner',
    period: '2010 - 2011'
  },
  {
    title: 'CSS winner',
    status: 'star',
    period: '2011 - 2012'
  },
  {
    title: 'Design nominees',
    status: 'site of the day',
    period: '2013 - 2014'
  },
  {
    title: 'CSS Design Awards',
    status: 'Winner',
    period: '2015 - 2016'
  },
  {
    title: 'UI/UX Design Awards',
    status: 'Winner',
    period: '2016 - 2017'
  }
]
</script>

<style scoped>
/* Custom scrollbar for awards list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #ff006e;
  border-radius: 3px;
}
</style>

