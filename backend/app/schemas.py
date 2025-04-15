def individual_userdata(user):
    return {
        "id": user("user_id")
        "name": user("user_name")
        "email": user("user_email")
        "createdAt": user("created_on")
        "updatedAt": user("last_update")
    }

def individual_notedata(note):
    return {
        "id": note("note_id")
        "title": note("note_title")
        "content": note("note_content")
        "createdAt": note("created_on")
        "updatedAt": user("last_update")
    }

def all_notes(notes):
    return [individual_notedata(note) for note in notes]