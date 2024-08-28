<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RoleChanged extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $roleMessage;

    public function __construct($user, $newRole)
    {
        $this->user = $user;

        // Determine the role message based on the new role
        if ($newRole == 2) {
            $this->roleMessage = 'Your role has been changed to Admin.';
        } elseif ($newRole == 3) {
            $this->roleMessage = 'Your role has been changed to User.';
        } else {
            $this->roleMessage = 'Your role has been updated.';
        }
    }

    public function build()
    {
        return $this->view('auth.emails.role_changed')
                    ->with([
                        'userName' => $this->user->name,
                        'roleMessage' => $this->roleMessage,
                    ]);
    }
}
