use strict;
use warnings;
use LWP::UserAgent;
use HTTP::Request::Common;

my $url = 'https://api.apigee.com/users';

my $code = q{
    use strict;
    use warnings;
    # Your Perl code here
    print "Hello, world!\n";
};

my $data = '{"code": "' . $code . '"}';

my $ua = LWP::UserAgent->new;
my $request = POST($url, Content_Type => 'application/json', Content => $data);
my $response = $ua->request($request);

if ($response->is_success) {
    print "Request sent successfully!\n";
    print "Response: " . $response->decoded_content . "\n";
} else {
    print "Failed to send request.\n";
    print "Error: " . $response->status_line . "\n";
}
