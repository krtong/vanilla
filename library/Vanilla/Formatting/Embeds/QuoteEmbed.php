<?php
/**
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0
 */

namespace Vanilla\Formatting\Embeds;

use Gdn_Format;
use Vanilla\PageScraper;

/**
 * Generic link embed.
 */
class QuoteEmbed extends Embed {

    /** @var PageScraper */
    private $pageScraper;

    /**
     * LinkEmbed constructor.
     *
     * @param PageScraper $pageScraper
     */
    public function __construct(PageScraper $pageScraper) {
        $this->pageScraper = $pageScraper;
        parent::__construct('quote', 'link');
    }

    function matchUrl(string $url) {
        return false;
    }

    /**
     * @inheritdoc
     */
    public function renderData(array $data): string {
        $url = $data['url'] ?? null;
        $name = $data['name'] ?? null;
        $bodyRaw = $data['bodyRaw'] ?? null;
        $format = $data['format'] ?? null;
        $username = $data['insertUser']['name'] ?? null;
        $userPhoto = $data['insertUser']['photoUrl'] ?? null;
        $timestamp = $data['dateUpdated'] ?? $data['dateInserted'] ?? null;

        $userNameEncoded = htmlspecialchars($username);
        $userPhotoUrlEncoded = htmlspecialchars($userPhoto);
        $humanTimeEncoded = htmlspecialchars(Gdn_Format::date($timestamp));
        $sanitizedUrl = htmlspecialchars(\Gdn_Format::sanitizeUrl($url));
        $nameEncoded = htmlspecialchars($name);
        $timeStampEncoded = htmlspecialchars($timestamp);
        $renderedBody = Gdn_Format::quoteEmbed($bodyRaw, $format);

        $userUrl = userUrl(['Name' => $username]);

        $title = $name ? "<h3 class=\"embedLink-title\">$nameEncoded</h3>" : null;
        $contentId = uniqid("collapsedContentToggle-");

        $result = <<<HTML
<div class="embedExternal embedLink embedQuote">
    <div class="embedExternal-content">
        <article class="embedLink-body">
            <div class="embedLink-main">
                <div class="embedLink-header">
                    {$title}
                    <a href="$userUrl" class="embedLink-userPhoto PhotoWrap">
                        <img
                            src="{$userPhotoUrlEncoded}"
                            alt="{$userNameEncoded}"
                            class="ProfilePhoto ProfilePhotoSmall"
                            tabIndex="-1"
                        />
                    </a>
                    <a href="$userUrl"><span class="embedLink-userName">{$userNameEncoded}</span></a>
                    <a href="$sanitizedUrl">
                        <time class="embedLink-dateTime meta" dateTime="{$timeStampEncoded}" title="{$humanTimeEncoded}">
                            {$humanTimeEncoded}
                        </time>
                    </a>
                    <button class="js-toggleCollapsableContent embedLink-collapseButton" 
                    aria-controls="$contentId">[ - ]</button>
                </div>
                <div class="embedLink-excerpt embedQuote-excerpt js-collapsableExcerpt userContent" 
                data-id="$contentId">$renderedBody</div>
            </div>
        </article>
    </div>
</div>
HTML;

        return $result;
    }
}
