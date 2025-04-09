import os
import yaml
import re
from datetime import datetime
import requests

def get_issue_details(issue_number):
    """Get issue details using GitHub API."""
    token = os.environ['GITHUB_TOKEN']
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    # Get repository info from environment
    repo = os.environ['GITHUB_REPOSITORY']
    
    # Get issue details
    url = f'https://api.github.com/repos/{repo}/issues/{issue_number}'
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Error getting issue {issue_number}: {response.status_code}")
        return None
    
    return response.json()

def parse_issue_body(body):
    """Parse issue body to extract booking details."""
    date_match = re.search(r'\*\*Date:\*\* ([\d-]+)', body)
    speaker_match = re.search(r'\*\*Speaker:\*\* (.+)', body)
    title_match = re.search(r'\*\*Title:\*\* (.+)', body)
    
    if not all([date_match, speaker_match, title_match]):
        return None
    
    return {
        'date': date_match.group(1),
        'speaker': speaker_match.group(1).strip(),
        'title': title_match.group(1).strip()
    }

def update_events_yml(booking):
    """Update events.yml with new booking."""
    events_file = '_data/events.yml'
    
    # Read current events
    with open(events_file, 'r') as f:
        data = yaml.safe_load(f)
    
    # Find or create event for the date
    event = None
    for e in data['events']:
        if e['date'] == booking['date']:
            event = e
            break
    
    if not event:
        event = {'date': booking['date'], 'slots': []}
        data['events'].append(event)
    
    # Add new slot if there's space
    if len(event['slots']) < 2:
        event['slots'].append({
            'title': booking['title'],
            'speaker': booking['speaker']
        })
        # Sort events by date
        data['events'].sort(key=lambda x: x['date'])
        
        # Write updated events
        with open(events_file, 'w') as f:
            yaml.dump(data, f, default_flow_style=False, sort_keys=False)
        return True
    
    return False

def main():
    # Get issue number from environment
    issue_number = os.environ['GITHUB_EVENT_ISSUE_NUMBER']
    
    # Get issue details
    issue = get_issue_details(issue_number)
    if not issue:
        return
    
    # Parse booking details
    booking = parse_issue_body(issue['body'])
    if not booking:
        print("Could not parse booking details from issue")
        return
    
    # Update events.yml
    if update_events_yml(booking):
        print(f"Successfully added booking for {booking['date']}")
    else:
        print(f"No available slots for {booking['date']}")

if __name__ == '__main__':
    main() 