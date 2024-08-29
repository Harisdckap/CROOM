<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdRemovedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $ad;

    /**
     * Create a new message instance.
     *
     * @param $ad
     */
    public function __construct($ad)
    {
        $this->ad = $ad;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('auth.emails.ad_removed')
            ->with([
                'adName' => $this->ad->ad_name,
                'adId' => $this->ad->id,
            ]);
    }
}
