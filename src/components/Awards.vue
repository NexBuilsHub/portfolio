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
                <h3 class="text-2xl font-bold text-gray-700 mb-8">CISCO</h3>
                <div class="flex justify-center mb-6">
                  <div class="relative">
                    <div class="w-32 h-32 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full flex items-center justify-center transform rotate-45">
                      <div class="transform -rotate-45 text-center">
                        <p class="text-xs font-bold">PCAP</p>
                        <p class="text-2xl font-bold">CERTIFIED</p>
                      </div>
                    </div>
                    <div class="absolute -left-4 top-8 transform -rotate-45">
                      <p class="text-xs font-bold">FEB</p>
                      <p class="text-sm font-bold">2023</p>
                    </div>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-6">
                  Python Certified Associate Programmer from Cisco Networking Academy
                </p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                  <span>2023 Official Certificate</span>
                  <span class="text-2xl font-bold">C</span>
                  <span>PCAP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Education & Certifications List -->
        <div data-aos="fade-left">
          <h2 class="text-5xl font-bold mb-8">Education & Certifications.</h2>
          <div class="space-y-6 max-h-96 overflow-y-auto pr-4">
            <div 
              v-for="(item, index) in education" 
              :key="index"
              class="border-l-4 border-pink-500 pl-6 py-4"
              data-aos="fade-left"
              :data-aos-delay="index * 100"
            >
              <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
              <p class="text-gray-400">{{ item.institution }}</p>
              <p class="text-pink-400 font-semibold">{{ item.period }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const education = [
  {
    title: 'Web Development Training (Bootcamp Mode)',
    institution: 'Digital Solidarity Center (Solicode)',
    period: '2022 - 2023'
  },
  {
    title: 'PCAP - Python Certified Associate Programmer',
    institution: 'Cisco Networking Academy',
    period: 'February 2023'
  },
  {
    title: 'Baccalaureate in Physical Sciences',
    institution: 'High School Mehdi El Manjra',
    period: '2021 - 2022'
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
