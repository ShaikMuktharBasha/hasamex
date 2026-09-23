import re
from pathlib import Path
from typing import List, Dict, Tuple
from app.models.schemas import Transcript, DialogueTurn, InterviewQuestion, EvidenceItem

def parse_transcript_file(file_path: Path) -> Transcript:
    content = file_path.read_text(encoding="utf-8").strip()
    lines = [line.strip() for line in content.splitlines() if line.strip()]
    
    expert_name = "Unknown Expert"
    expert_role = "Expert"
    market = "Unknown"
    
    # Extract header metadata
    header_lines = []
    body_start_idx = 0
    
    for idx, line in enumerate(lines):
        if re.match(r"^\d{2}:\d{2}", line):
            body_start_idx = idx
            break
        header_lines.append(line)
        
    for line in header_lines:
        if line.startswith("Expert"):
            parts = line.split("–")
            if len(parts) > 1:
                expert_name = parts[1].strip()
        elif line.startswith("Role:"):
            expert_role = line.replace("Role:", "").strip()
        elif line.startswith("Market:"):
            market = line.replace("Market:", "").strip()
            
    # Normalize market name and transcript ID
    market_id = market.lower()
    if "france" in market_id:
        transcript_id = "france"
        country = "France"
    elif "germany" in market_id:
        transcript_id = "germany"
        country = "Germany"
    elif "uk" in market_id or "united kingdom" in market_id:
        transcript_id = "uk"
        country = "United Kingdom"
    else:
        transcript_id = file_path.stem.lower()
        country = market

    # Parse dialogue turns
    raw_text = "\n".join(lines[body_start_idx:])
    # Split by timestamp patterns (e.g. 00:00, 01:12)
    turn_blocks = re.split(r"(?m)^(\d{2}:\d{2})\s*$", raw_text)
    
    dialogue_turns: List[DialogueTurn] = []
    turn_idx = 0
    
    # re.split with capture returns: ['', '00:00', 'Speaker: text...', '00:18', 'Speaker: text...']
    i = 1
    while i < len(turn_blocks) - 1:
        timestamp = turn_blocks[i].strip()
        body = turn_blocks[i+1].strip()
        i += 2
        
        if not body:
            continue
            
        # Extract speaker and text
        colon_idx = body.find(":")
        if colon_idx != -1:
            speaker = body[:colon_idx].strip()
            text = body[colon_idx+1:].strip()
        else:
            speaker = expert_name
            text = body
            
        is_interviewer = "interviewer" in speaker.lower()
        
        dialogue_turns.append(DialogueTurn(
            turn_index=turn_idx,
            timestamp=timestamp,
            speaker=speaker,
            text=text,
            is_interviewer=is_interviewer
        ))
        turn_idx += 1
        
    return Transcript(
        id=transcript_id,
        country=country,
        expert_name=expert_name,
        expert_role=expert_role,
        dialogue_turns=dialogue_turns,
        total_turns=len(dialogue_turns),
        full_text=content
    )

def parse_interview_guide(file_path: Path) -> List[InterviewQuestion]:
    content = file_path.read_text(encoding="utf-8").strip()
    questions: List[InterviewQuestion] = []
    
    theme_map = {
        1: "Current Market Adoption",
        2: "Adoption Barriers & Capital Approval",
        3: "Budgets & ROI Importance",
        4: "Surgeon Training & Outcomes",
        5: "3-5 Year Outlook & Growth",
        6: "Purchasing Timelines & Decision Process"
    }
    
    for line in content.splitlines():
        line = line.strip()
        match = re.match(r"^(\d+)\.\s*(.+)$", line)
        if match:
            num = int(match.group(1))
            text = match.group(2).strip()
            questions.append(InterviewQuestion(
                id=f"q{num}",
                question_number=num,
                question_text=text,
                theme=theme_map.get(num, f"Theme {num}")
            ))
            
    return questions

def extract_evidence_chunks(transcripts: Dict[str, Transcript]) -> List[EvidenceItem]:
    evidence_list: List[EvidenceItem] = []
    
    for tid, transcript in transcripts.items():
        for turn in transcript.dialogue_turns:
            # We focus primarily on the expert statements for evidence
            if not turn.is_interviewer:
                evidence_list.append(EvidenceItem(
                    id=f"{tid}_{turn.turn_index}",
                    transcript_id=tid,
                    country=transcript.country,
                    expert_name=transcript.expert_name,
                    expert_role=transcript.expert_role,
                    timestamp=turn.timestamp,
                    quote=turn.text,
                    context=f"{turn.speaker} ({transcript.country}) at {turn.timestamp}",
                    turn_index=turn.turn_index,
                    theme=None
                ))
    return evidence_list
