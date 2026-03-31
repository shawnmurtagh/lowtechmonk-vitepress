<script setup>
import { computed, ref } from 'vue';

const circleElements = [
  {
    key: 'fire',
    name: 'Fire',
    description: 'The shared source of warmth, purpose, and direction.',
  },
  {
    key: 'stones',
    name: 'Stones',
    description: 'The memories that steady a family, community, or organization.',
  },
  {
    key: 'songs',
    name: 'Songs',
    description: 'The practices that carry belief into repeated action.',
  },
  {
    key: 'tools',
    name: 'Tools',
    description: 'The technologies you welcome only when they serve what matters most.',
  },
];

const activeCircleIndex = ref(0);
const activeCircleElement = computed(() => circleElements[activeCircleIndex.value]);

function setActiveCircle(index) {
  activeCircleIndex.value = index;
}

function showPreviousCircle() {
  activeCircleIndex.value =
    (activeCircleIndex.value - 1 + circleElements.length) % circleElements.length;
}

function showNextCircle() {
  activeCircleIndex.value = (activeCircleIndex.value + 1) % circleElements.length;
}
</script>

<template>
  <div class="ltm-home">
    <section class="ltm-section ltm-section--narrow">
      <p class="ltm-section__eyebrow">Why You Need a Cyber Wisdom Framework</p>
      <h2 class="ltm-section__title">Human values shouldn't change because of the way we use technology. Technology should conform to our values.</h2>
      <p class="ltm-section__copy">
        A generation ago, screens were something we visited. Now they travel with us everywhere.
        Pew reports that 91% of U.S. adults own smartphones<sup class="ltm-footnote">1<span class="ltm-footnote__tooltip">Pew Research Center. “Mobile Fact Sheet.” <i>Pew Research Center</i>, 20 Nov. 2025, www.pewresearch.org/fact-sheet/mobile/.</span></sup>,
        while 46% of teens say they are online almost constantly<sup class="ltm-footnote">2<span class="ltm-footnote__tooltip">Anderson, Monica, Michelle Faverio, and Eugenie Park. “How Teens and Parents Approach Screen Time.” <i>Pew Research Center</i>, 11 Mar. 2024, www.pewresearch.org/internet/2024/03/11/how-teens-and-parents-approach-screen-time/.</span></sup>.
        Common Sense Media found that teens spend 8 hours and 39 minutes daily on entertainment screen media<sup class="ltm-footnote">3<span class="ltm-footnote__tooltip">Rideout, Victoria, and Michael Robb. <i>The Common Sense Census: Media Use by Tweens and Teens, 2021</i>. Common Sense Media, 2021, www.commonsensemedia.org/sites/default/files/research/report/8-18-census-integrated-report-final-web_0.pdf.</span></sup>.
        When technology is this present, it does not just fill spare time. It rearranges attention, memory, and relationships. A cyber wisdom framework gives us a way to decide, together, what belongs near the center of our lives and what does not.
      </p>

      <blockquote class="ltm-quote">
        "We must begin with what matters most to us, then decide how technology fits into that life."
      </blockquote>

      <a class="ltm-inline-link" href="/the-why">Read why this framework is needed</a>
    </section>

    <section class="ltm-circle-band">
      <div class="ltm-circle-band__inner">
        <div class="ltm-circle-band__copy">
          <p class="ltm-section__eyebrow ltm-circle-band__eyebrow">It Starts with a Circle</p>
          <h2 class="ltm-section__title ltm-circle-band__title">A way to keep human things at the center.</h2>
          <p class="ltm-circle-band__proverb">
            When we draw a line we divide. When we draw a circle, we create a center.
          </p>
          <p class="ltm-section__copy ltm-circle-band__description">
            The circle is a simple structure for deciding what matters, what grounds you,
            what practices keep those values alive, and which tools deserve a place near your fire.
          </p>
        </div>

        <div class="ltm-circle-slider" aria-label="Elements of the circle">
          <div class="ltm-circle-slider__card">
            <p class="ltm-circle-slider__label">Element</p>
            <p class="ltm-circle-slider__name">{{ activeCircleElement.name }}</p>
            <p class="ltm-circle-slider__description">{{ activeCircleElement.description }}</p>
          </div>

          <div class="ltm-circle-slider__controls">
            <button class="ltm-circle-slider__arrow" type="button" @click="showPreviousCircle" aria-label="Show previous element">
              &larr;
            </button>

            <div class="ltm-circle-slider__tabs" role="tablist" aria-label="Choose circle element">
              <button
                v-for="(element, index) in circleElements"
                :key="element.key"
                class="ltm-circle-slider__tab"
                :class="{ 'is-active': index === activeCircleIndex }"
                type="button"
                role="tab"
                :aria-selected="index === activeCircleIndex ? 'true' : 'false'"
                :aria-label="`Show ${element.name}`"
                @click="setActiveCircle(index)"
              >
                {{ element.name }}
              </button>
            </div>

            <button class="ltm-circle-slider__arrow" type="button" @click="showNextCircle" aria-label="Show next element">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="ltm-section">
      <div class="ltm-section__intro">
        <p class="ltm-section__eyebrow">Wisdom Literature and Fables</p>
        <h2 class="ltm-section__title">Enter by the question that already has hold of you.</h2>
        <p class="ltm-section__copy">
          You do not have to begin only at <code>The Why</code> or in the app. If you are carrying a more
          particular question, there are stories and essays that may meet you there first.
        </p>
      </div>

      <div class="ltm-reading-grid">
        <article class="ltm-reading-card">
          <p class="ltm-reading-card__eyebrow">From the Wisdom Literature</p>
          <ul class="ltm-reading-card__list">
            <li><a href="/wisdom-literature/fear-forgetting">Fear Forgetting</a> for memory, aging, and what is lost when a people stop tending their names.</li>
            <li><a href="/wisdom-literature/on-ai-and-the-memory-of-song">On AI Music and the Memory of Song</a> for the question of art, machines, and what happens when song is severed from life.</li>
            <li><a href="/wisdom-literature/the-circle-of-trust">The Circle of Trust</a> for the boundaries that protect a people and the responsibilities that hold them together.</li>
          </ul>
        </article>

        <article class="ltm-reading-card">
          <p class="ltm-reading-card__eyebrow">From the Fables</p>
          <ul class="ltm-reading-card__list">
            <li><a href="/fables/there-are-giants-in-the-land-1">There are Giants in the Land</a> for the feeling of standing before powers larger than yourself and deciding whether you will still guard the fire.</li>
          </ul>
        </article>
      </div>

      <div class="ltm-reading-actions">
        <a class="ltm-button ltm-button--secondary" href="/the-way">Read the Way</a>
        <a class="ltm-button ltm-button--primary" href="https://app.lowtechmonk.com">Build Your Circle</a>
      </div>
    </section>
  </div>
</template>
