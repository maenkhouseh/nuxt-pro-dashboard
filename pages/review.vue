<script setup lang="ts">
const links = [
  [
    {
      label: 'General',
      icon: 'i-heroicons-user-circle',
      to: '/settings',
      exact: true
    },
    {
      label: 'Members',
      icon: 'i-heroicons-user-group',
      to: '/settings/members'
    },
    {
      label: 'Notifications',
      icon: 'i-heroicons-bell',
      to: '/settings/notifications'
    }
  ],
  [
    {
      label: 'Documentation',
      icon: 'i-heroicons-book-open',
      to: 'https://ui.nuxt.com/pro',
      target: '_blank'
    },
    {
      label: 'Buy now',
      icon: 'i-heroicons-credit-card',
      to: 'https://ui.nuxt.com/pro/purchase',
      target: '_blank'
    }
  ]
];

const source = ref(null);
const target = ref(null);



function adjustOverlayHeight() {
  if (source.value) {
    source.value.style.height = `${source.value.scrollHeight}px`;
  }
}

// /${uriEncode('https://evotik.com/')}

const { data } = await useFetch(`/api/site`, { default: () => [] })

const frameSrouce = ref(null)
frameSrouce.value = data.value

function loadIframeContent(data) {
  const iframe = document.getElementById('target');
  if (iframe && iframe.contentDocument) {
    const iframeDocument = iframe.contentDocument;
    iframeDocument.open();
    iframeDocument.write(data);
    iframeDocument.close();
  }
}

onMounted(() => {
  adjustOverlayHeight();
    loadIframeContent(frameSrouce.value)

});
console.log(data)

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Settings" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <div class="w-full">
        <div
          class="w-[98.2%] h-screen absolute bg-blue-600 bg-opacity-50"
          ref="source" 
          style="overflow-y: scroll;"
          @scroll="syncScroll"
        >
          <div style="height: 5000px;" class="content">
            OVERLAY
          </div>
        </div>
        <iframe
            id="target"
          class="h-screen w-full"
          :src="frameSrouce"
          ref="target"
        ></iframe>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
