import { Btn, PageHero } from '@/components/ui'

export default function NotFound() {
  return (
    <PageHero id="nf-title" eyebrow="404" title="This bed is *still resting.*" intro="We couldn’t find that page. It may have moved, or it hasn’t been published yet.">
      <div className="row">
        <Btn href="/" variant="sun">
          Go home
        </Btn>
        <Btn href="/learn" variant="line-light" icon="search">
          Search the Knowledge Library
        </Btn>
      </div>
    </PageHero>
  )
}
